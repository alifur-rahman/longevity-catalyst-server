interface VoteAttributes {
  id: number;
  userId: number;
  projectId: number;
  voteType: "up" | "down";
  createdAt: Date;
  updatedAt: Date;
}

export default VoteAttributes;
