var DocumentFields = "\n  title: String\n  status: DocumentStatus\n  createdAt: String\n  updatedAt: String\n  content: String\n";
export default "\n  type Document {\n    _id: ID\n    userId: ID\n    ".concat(DocumentFields, "\n  }\n\n  enum DocumentStatus {\n    draft\n    published\n  }\n\n  input DocumentInput {\n    ").concat(DocumentFields, "\n  }\n");
//# sourceMappingURL=types.js.map