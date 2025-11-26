import Test from "@/components/companies/Test";

const Tables = () => {

  enum Permissions {
    ViewProducts   = 1, // 1 << 0, // 000001 -> 1
    CreateProducts = 2, // 1 << 1, // 000010 -> 2
    EditProducts   = 3, // 4, // 1 << 2, // 000100 -> 4
    DeleteProducts = 4, // 8, // 1 << 3, // 001000 -> 8
    ViewOrders     = 5, // 16, // 1 << 4, // 010000 -> 16
    CreateOrders    = 6, // 32, // 1 << 5, // 100000 -> 32
    // EditOrders = 1 << 6,
    // A1 = 1 << 7,
    // A2 = 1 << 8,
    // A3 = 1 << 9,
    // A4 = 1 << 10,
    // A5 = 1 << 11,
    // A6 = 1 << 12,
    // A7 = 1 << 13,
    // A8 = 1 << 14,
    // A9 = 1 << 15,
    // A10 = 1 << 16,
    // A11 = 1 << 17,
  } 

  // 2️⃣ Convierte un array de permisos en número entero
  function encodePermissions(perms: Permissions[]): number {
  return perms.reduce((acc, perm) => acc | (1 << (perm - 1)), 0);
    // Usa OR bitwise para encender cada bit
  }

  // 3️⃣ Convierte un número entero a una lista de permisos activos
  function decodePermissions(value: number): number[] {
    // return Object.values(Permissions)
    //   .filter((perm) => typeof perm === "number" && (value & (perm as number)) !== 0)
    //   .map((perm) => perm as Permissions);

    const result : number[]=[];
    for(let i = 1; i <=32 ;i++){
      if(value & ( 1 << (i-1))){
        result.push(i);
      }
    }

    return result;
  }

  // 4️⃣ Verifica si un permiso está activo
  function hasPermission(value: number, perm: Permissions): boolean {
    return (value & perm) !== 0;
  }

  // 5️⃣ Agrega un permiso
  function addPermission(value: number, perm: Permissions): number {
    return value | perm;
  }

  // 6️⃣ Quita un permiso
  function removePermission(value: number, perm: Permissions): number {
    return value & ~perm;
  }


  const myPerms = encodePermissions([
    Permissions.CreateProducts,
    Permissions.CreateOrders
  ])

  console.log("mis permisos: " , myPerms)

  console.log("Permisos activos:", decodePermissions(myPerms));

  return (
    <div>
      <Test />
    </div>
  )
}

export default Tables