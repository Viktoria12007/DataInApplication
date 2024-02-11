import { Button } from "../Button";
import "./LogoutButton.css";
import {logoutUser} from "../../api/User";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient";

export const LogoutButton = () => {
    const logoutMutation = useMutation({
        mutationFn: () => logoutUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        }
    }, queryClient);

  return (
    <div className="logout-button">
      <Button
          kind="secondary"
          onClick={() => logoutMutation.mutate()}
          isLoading={logoutMutation.isPending}
      >
          Выйти
      </Button>
    </div>
  );
};
