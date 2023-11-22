import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  
    Blog: a.model({
      title: a.string(),
      content: a.string(),
      tags: a.manyToMany('Tag',{
        relationName: 'BlogTags',
      }),
      comments: a.hasMany('Comment'),
    }).authorization([a.allow.owner(), a.allow.public().to(['read'])]),

    Tag: a.model({
      name: a.string(),
      blogs: a.manyToMany('Blog',{
        relationName: 'BlogTags',
      }),
    }).authorization([a.allow.owner(), a.allow.public().to(['read'])]),

    Comment: a.model({
      content: a.string(),
      blog: a.belongsTo("Blog"),
    }).authorization([a.allow.owner(), a.allow.public().to(['read'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});