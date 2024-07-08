import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Skeleton from '../../components/Skeleton';

const LoadingIssueDetailPage = async () => {

  return (
    <Box className="max-w-xl">
      <Heading>{<Skeleton />}</Heading>
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
