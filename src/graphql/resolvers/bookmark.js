const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

const BOOKMARK = require("../../models").Bookmark;
const Folder = require("../../models").Folder;
const SubFolder = require("../../models").SubFolder;
const logger = require("../../../utils/logger");
const client = require("../../../utils/redis_connect");
const sendUserMail = require("../../../utils/queue");

const resolver = {
  Folder: {
    SubFolders: ({ id }, args) =>
      SubFolder.findAll({
        where: {
          Folder_ID: id,
        },
      }),

    bookmarks: ({ id }, args) =>
      BOOKMARK.findAll({
        where: {
          subfolder: id,
        },
      }),
  },

  SubFolder: {
    bookmarks: ({ id }, args) =>
      BOOKMARK.findAll({
        where: {
          subfolder: id,
        },
      }),
  },

  Query: {
    allFolders: (parent, args) => Folder.findAll(),

    getFolder: (parent, { name }) =>
      Folder.findOne({
        where: {
          name,
        },
      }),

    subfolders: (parent, { Folder_ID }) =>
      SubFolder.findAll({
        where: {
          Folder_ID,
        },
      }),

    bookmarks: async (parent, { subfolder }) => {
      const bookmarks = await BOOKMARK.findAll({
        where: {
          subfolder,
        },
      });

      if (!bookmarks) {
        throw new Error("Error");
      }

      const reply = await client.get("bookmark");

      if (reply) {
        logger.info("using cached data");

        logger.info(JSON.stringify(reply));

        return JSON.parse(reply);
      }

      const saveResult = await client.setEx(
        "bookmark",
        10,
        JSON.stringify(bookmarks)
      );

      logger.info(`new data cached ${saveResult}`);

      return bookmarks;
    },

    bookmark: (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must login to add a Bookmark.");
      }

      const bookmarkDetails = BOOKMARK.findByPk(id);

      if (!bookmarkDetails) {
        throw new Error("Error");
      }

      return bookmarkDetails;
    },
  },

  Mutation: {
    createFolder: (parent, args) => Folder.create(args),

    deleteFolder: (parent, args) => Folder.destroy({ where: args }),

    createSubFolder: (parent, args) => SubFolder.create(args),

    addBookmark: (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must login to add a Bookmark.");
      }

      const bookmark = new BOOKMARK(args);
      const newBookmarks = bookmark.save();

      if (!newBookmarks) {
        throw new Error("Error");
      }

      sendUserMail(context.user.email);

      return newBookmarks;
    },

    updateBookmark: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must login to add a Bookmark.");
      }

      let bookmark;

      try {
        bookmark = await BOOKMARK.findByPk(args.id);

        if (!bookmark) {
          throw new Error("Not Found");
        }

        const { title, tag } = args;

        bookmark.update({
          title: title || bookmark.title,
          url: bookmark.url,
          tag: tag || bookmark.tag,
        });

        return bookmark;
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteBookmark: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must login to add a Bookmark.");
      }

      let bookmark;

      try {
        bookmark = await BOOKMARK.findByPk(args.id);

        if (!bookmark) {
          throw new Error("Not Found");
        }

        bookmark.destroy();

        return bookmark;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = resolver;
