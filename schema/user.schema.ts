import * as dynamoose from 'dynamoose';

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = dynamoose.model('User', UserSchema);
