module.exports = {
  MONGO_ID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  ROLES: Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
    WRITTER: "WRITTER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  }),

  PERMISSIONS: Object.freeze({
    USER: ["PROFILE"],
    ADMIN: ["ADMIN"],
    SUPERADMIN: ["ALL"],
    CONTENT_MANGER: [
      "COURSE",
      "BLOG",
      "CATEGORY",
      "PRODUCT",
      "EPISODE",
      "CHAPTER",
    ],
    TEACHER: ["COURSE", "BLOG"],
    SUPPLIER: ["PRODUCT"],
    ALL: "ALL",
  }),

  ACCESS_TOKEN_SECRET_KEY:
    "660B98B387D2B7B9C83B7C2604E7BEBB409DC562D2E2491F0C706F61588E4304",
  REFRESH_TOKEN_SECRET_KEY:
    "C2663E6FDF96CB6592AB67DBDE8E3702DF89D411AFE1FD1F7661014AB47E20DB",
};
