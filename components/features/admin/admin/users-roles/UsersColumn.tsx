import { Column } from "@/components/local/custom/custom-table";
import { Badge } from "@/components/ui/badge";
import { User } from "./utils/types";
import UsersActions from "./users/UsersActions";

export const usersColumns: Column<User>[] = [
  {
    key: "name",
    title: "Name",
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "email",
    title: "Email",
    render: (value) => <span className="text-sm text-gray-600">{value}</span>,
  },
  {
    key: "role",
    title: "Role",
    render: (value) => <span className="text-sm">{value}</span>,
  },
  {
    key: "entities",
    title: "Entities",
    render: (value: string[], row) => (
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-wrap">
          {value.slice(0, 2).map((entity) => (
            <Badge key={entity} variant="secondary" className="text-xs">
              {entity}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2} more
            </Badge>
          )}
        </div>
        {row.entityType && (
          <Badge variant={row.entityType === "Group" ? "default" : "outline"}>
            {row.entityType}
          </Badge>
        )}
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (value) => (
      <Badge
        variant={value === "Active" ? "default" : "secondary"}
        className={
          value === "Active"
            ? "bg-green-100 text-green-700 hover:bg-green-100"
            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
        }
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    render: (_, row) => <UsersActions user={row} />,
    searchable: false,
  },
];
