import {
  Card,
  CardBody,
  StackDivider,
  VStack,
  Text,
  Box,
  Avatar,
  Flex,
} from "../../common/components";
import { Comment } from "../../types";

export default async function Comments({
  commentPromise,
}: {
  commentPromise: Promise<Comment[]>;
}) {
  const comments = await commentPromise;

  if (comments.length === 0) {
    return (
      <Text as="p" fontSize="md">
        コメントはありません。
      </Text>
    );
  }
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      as="ul"
      align="stretch"
      px={4}
    >
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </VStack>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <Flex as="li" listStyleType="none" align="center">
      <Avatar
        size="sm"
        name={comment.author.name}
        src={comment.author.avatarUrl}
        mr={4}
      />
      <Text fontSize="sm">{comment.body}</Text>
    </Flex>
  );
}
