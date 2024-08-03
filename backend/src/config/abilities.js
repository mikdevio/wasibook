import { defineAbility } from "@casl/ability";

export default (user) =>
  defineAbility((can, cannot, build) => {
    can("read", "User");

    switch (user.role) {
      case "admin":
        can("manage", "all");
        break;
      case "staff":
        can("read", "all");
        can("update", "all");
        cannot("delete", "all");
        break;
      case "customer":
        can("read", "Profile");
        can("update", "Profile", { id: "userId" });
        break;
      default:
        can("read", "public");
    }

    return build();
  });
