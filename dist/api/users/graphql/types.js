var UserFields = "\n  _id: ID\n  emailAddress: String\n";
var NameFields = "\n  first: String\n  last: String\n";
export default "\n  type User {\n    ".concat(UserFields, "\n    name: Name\n  }\n\n  type Name {\n    ").concat(NameFields, "\n  }\n\n  input UserInput {\n    ").concat(UserFields, "\n    password: String\n    name: NameInput\n  }\n\n  input NameInput {\n    ").concat(NameFields, "  \n  }\n");
//# sourceMappingURL=types.js.map