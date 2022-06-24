const BOOKMARK = require("../../src/models").Bookmark;

const resolver = {
  Query: {
    bookmarks: () => {
      const bookmarks = BOOKMARK.findAll({
        order: [["id"]],
      });

      if (!bookmarks) {
        throw new Error("Error");
      }

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
