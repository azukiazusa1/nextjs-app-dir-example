import {
  StackDivider,
  VStack,
  Flex,
  SkeletonCircle,
  Skeleton,
} from "../../common/components";

export default function LoadingComments({}) {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      as="ul"
      align="stretch"
      px={4}
    >
      <CommentSkeltonItem />
      <CommentSkeltonItem />
      <CommentSkeltonItem />
    </VStack>
  );
}

function CommentSkeltonItem() {
  return (
    <Flex as="li" listStyleType="none" align="center">
      <SkeletonCircle size="8" mr={4} />
      <Skeleton height="14px" width="60%" />
    </Flex>
  );
}
