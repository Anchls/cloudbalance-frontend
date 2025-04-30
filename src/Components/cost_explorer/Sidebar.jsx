// Sidebar.jsx
import React from "react";
import { Drawer, IconButton, Box, useMediaQuery } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Sidebar({
  open,
  onOpen,
  onClose,
  children,
}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  if (isMobile) {
    // Floating FAB-like icon on mobile to open bottom drawer
    return (
      <>
        <IconButton
          color="primary"
          onClick={onOpen}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            bgcolor: "background.paper",
            boxShadow: 3,
            zIndex: 1300,
          }}
        >
          <FilterListIcon />
        </IconButton>
        <Drawer
          anchor="bottom"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ p: 2, maxHeight: "70vh", overflowY: "auto" }}>{children}</Box>
        </Drawer>
      </>
    );
  }

  // Desktop/tablet: sticky side drawer
  return (
    <Box
      sx={{
        position: "sticky",
        top: 24,
        alignSelf: "flex-start",
        width: 280,
      }}
    >
      {children}
    </Box>
  );
}
