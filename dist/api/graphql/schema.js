var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import DocumentTypes from "../documents/graphql/types.js";
import DocumentQueries from "../documents/graphql/queries.js";
import DocumentMutations from "../documents/graphql/mutations.js";
import UserTypes from "../users/graphql/types.js";
import UserQueries from "../users/graphql/queries.js";
import UserMutations from "../users/graphql/mutations.js";
var schema = {
    typeDefs: gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n    ", "\n\n    type Query {\n      document(documentId: ID!): Document\n      documents: [Document]\n      user: User\n    }\n\n    type Mutation {\n      createDocument(document: DocumentInput!): Document\n      deleteDocument(documentId: ID!): Document\n      login(emailAddress: String!, password: String!): User\n      loginWithToken: User\n      logout: Boolean\n      recoverPassword(emailAddress: String!): Boolean\n      resetPassword(\n        token: String!\n        newPassword: String!\n        repeatNewPassword: String!\n      ): Boolean\n      signup(user: UserInput): User\n      updateDocument(documentId: ID!, document: DocumentInput!): Document\n    }\n  "], ["\n    ", "\n    ", "\n\n    type Query {\n      document(documentId: ID!): Document\n      documents: [Document]\n      user: User\n    }\n\n    type Mutation {\n      createDocument(document: DocumentInput!): Document\n      deleteDocument(documentId: ID!): Document\n      login(emailAddress: String!, password: String!): User\n      loginWithToken: User\n      logout: Boolean\n      recoverPassword(emailAddress: String!): Boolean\n      resetPassword(\n        token: String!\n        newPassword: String!\n        repeatNewPassword: String!\n      ): Boolean\n      signup(user: UserInput): User\n      updateDocument(documentId: ID!, document: DocumentInput!): Document\n    }\n  "])), DocumentTypes, UserTypes),
    resolvers: {
        Query: __assign(__assign({}, DocumentQueries), UserQueries),
        Mutation: __assign(__assign({}, DocumentMutations), UserMutations),
    },
};
export default makeExecutableSchema(schema);
var templateObject_1;
//# sourceMappingURL=schema.js.map