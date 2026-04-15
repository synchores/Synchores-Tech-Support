import { registerEnumType } from '@nestjs/graphql';

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

registerEnumType(ContentStatus, {
  name: 'ContentStatus',
});
