const BOOKMARK = require("../../models").Bookmark;
const logger = require("../../../utils/logger");
const client = require("../../../utils/redis_connect");
const sendUserMail = require("../../../utils/queue");

require("dotenv").config();

const resolver = {
  Query: {
    bookmarks: async () => {
      const bookmarks = await BOOKMARK.findAll({
        order: [["id"]],
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

    bookmark: (parent, { id }) => {
      const bookmarkDetails = BOOKMARK.findByPk(id);

      if (!bookmarkDetails) {
        throw new Error("Error");
      }

      return bookmarkDetails;
    },
  },

  Mutation: {
    addBookmark: (parent, args) => {
      const bookmark = new BOOKMARK(args);
      const newBookmarks = bookmark.save();

      if (!newBookmarks) {
        throw new Error("Error");
      }

      sendUserMail(process.env.RECEIVER_EMAIL_DEFAULT);

      return newBookmarks;
    },

    updateBookmark: async (parent, args) => {
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

    deleteBookmark: async (parent, args) => {
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
