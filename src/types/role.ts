export interface Role{
    _id: string
    name: string
    companyId: string
    permissions: number
    active: boolean
}

const RolePermission = {
  // 📦 Productos
  VIEW_PRODUCTS   : 1 << 0,
  CREATE_PRODUCTS : 1 << 1,
  EDIT_PRODUCTS   : 1 << 2,
  DELETE_PRODUCTS : 1 << 3,

  // 📦 Pedidos
  VIEW_ORDERS     : 1 << 4,
  CREATE_ORDERS   : 1 << 5,
  CANCEL_ORDERS   : 1 << 6,

  // 📦 Mesas
  VIEW_TABLES     : 1 << 7,
  MANAGE_TABLES  : 1 << 8,

  // 📦 Usuarios / Roles
  VIEW_USERS      : 1 << 9,
  MANAGE_USERS    : 1 << 10,

  // 📦 Configuración
  VIEW_SETTINGS   : 1 << 11,
  MANAGE_SETTINGS : 1 << 12,
}
export const PERMISSIONS_BY_MODULE = [
  {
    module: "Productos",
    permissions: [
      { label: "Ver productos", value: RolePermission.VIEW_PRODUCTS },
      { label: "Crear productos", value: RolePermission.CREATE_PRODUCTS },
      { label: "Editar productos", value: RolePermission.EDIT_PRODUCTS },
      { label: "Eliminar productos", value: RolePermission.DELETE_PRODUCTS },
    ],
  },
  {
    module: "Pedidos",
    permissions: [
      { label: "Ver pedidos", value: RolePermission.VIEW_ORDERS },
      { label: "Crear pedidos", value: RolePermission.CREATE_ORDERS },
      { label: "Cancelar pedidos", value: RolePermission.CANCEL_ORDERS },
    ],
  },
  {
    module: "Mesas",
    permissions: [
      { label: "Ver mesas", value: RolePermission.VIEW_TABLES },
      { label: "Administrar mesas", value: RolePermission.MANAGE_TABLES },
    ],
  },
  {
    module: "Usuarios y roles",
    permissions: [
      { label: "Ver usuarios", value: RolePermission.VIEW_USERS },
      { label: "Administrar usuarios", value: RolePermission.MANAGE_USERS },
    ],
  },
  {
    module: "Configuración",
    permissions: [
      { label: "Ver configuración", value: RolePermission.VIEW_SETTINGS },
      { label: "Administrar configuración", value: RolePermission.MANAGE_SETTINGS },
    ],
  },
];