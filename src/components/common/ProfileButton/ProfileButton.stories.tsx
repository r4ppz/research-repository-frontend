import { Meta, StoryObj } from "@storybook/react-vite";
import { ProfileButton } from "./ProfileButton";
import { User } from "@/types";

const meta = {
  component: ProfileButton,
} satisfies Meta<typeof ProfileButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const currentUser: User = {
  userId: 123,
  email: "testing@gmail.com",
  fullName: "Charly Kirk",
  role: "STUDENT",
  profilePictureUrl: "nothing",
  department: null,
};

export const Default: Story = {
  args: {
    user: currentUser,
  },
  render: (args) => <ProfileButton user={args.user} />,
};
