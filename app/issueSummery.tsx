import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummery = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issue",
      value: open,
      status: "OPEN",
    },
    {
      label: "In-progress Issue",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed issue",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap="2">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="2">
            <Link
              className="font-medium text-sm"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummery;
