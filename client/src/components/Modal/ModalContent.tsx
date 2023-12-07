import { Box, Button, Typography } from "@mui/material";

interface Props {
  setIsModalOpen: (isOpen: boolean) => void;
  handleSubmit: (event: any) => void;
}

export default function ModalContent({ setIsModalOpen, handleSubmit }: Props) {
  return (
    <>
      <Typography mb={2}>
        Order Accepted, Do You Wish To Save Your Order?
      </Typography>
      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          onClick={() => {
            setIsModalOpen(false);
            location.reload();
          }}
        >
          Exit
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Order
        </Button>
      </Box>
    </>
  );
}
