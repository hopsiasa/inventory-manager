import { useRouter } from "next/router";
import type { FC } from "react";

export const withRoles =
  (Component: FC, requiredPermissions: string[], redirectPath: string) =>
  (props: any) => {
    const router = useRouter();

    // Helper function for checking required permissions
    const hasRequiredPermissions = (permissions: string[]): boolean => {
      // Get userPermissions from the redux-store or any other source
      const userPermissions = ["admin", "manager", "customer"];
      return permissions.some((permission) =>
        userPermissions.includes(permission)
      );
    };

    const hasPermission = hasRequiredPermissions(requiredPermissions);

    if (hasPermission) {
      return <Component {...props} />;
    } else {
      router.push(redirectPath);
      return null;
    }
  };
