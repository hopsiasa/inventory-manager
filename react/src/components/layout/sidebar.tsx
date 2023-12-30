import { Box, Drawer, Theme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { ReactNode, useEffect, useMemo } from "react";
import type { TFunction } from "react-i18next";
import { useTranslation } from "react-i18next";
import { Home as HomeIcon } from "../../icons/home";
import { ShoppingBag as ShoppingBagIcon } from "../../icons/shopping-bag";
import { ShoppingCart as ShoppingCartIcon } from "../../icons/shopping-cart";
import { Users as UsersIcon } from "../../icons/users";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";
import { SidebarSection } from "./sidebar-section";
import { Category as CategoryIcon } from "@mui/icons-material";

interface SidebarProps {
  onClose?: () => void;
  open?: boolean;
}

interface Item {
  title: string;
  children?: Item[];
  chip?: ReactNode;
  icon?: ReactNode;
  path?: string;
}

interface Section {
  title: string;
  items: Item[];
}

const getSections = (t: TFunction): Section[] => [
  {
    title: t("General"),
    items: [
      {
        title: t("Dashboard"),
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("Management"),
    items: [
      {
        title: t("Users"),
        path: "/users",
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: t("Categories"),
        path: "/categories",
        icon: <CategoryIcon fontSize="small" />,
      },
      {
        title: t("Products"),
        path: "/products",
        icon: <ShoppingBagIcon fontSize="small" />,
      },
      {
        title: t("Orders"),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: "/orders",
        children: [
          {
            title: t("List"),
            path: "/orders",
          },
          {
            title: t("Details"),
            path: "/orders/1",
          },
        ],
      },
    ],
  },
];

export const Sidebar: FC<SidebarProps> = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath],
  );

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <Link href="/" passHref>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </Link>
            </Box>
          </div>

          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <SidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
