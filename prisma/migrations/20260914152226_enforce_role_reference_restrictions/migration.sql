-- DropForeignKey
ALTER TABLE "management_staffs" DROP CONSTRAINT "management_staffs_current_position_id_fkey";

-- DropForeignKey
ALTER TABLE "management_staffs" DROP CONSTRAINT "management_staffs_current_role_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AddForeignKey
ALTER TABLE "management_staffs" ADD CONSTRAINT "management_staffs_current_position_id_fkey" FOREIGN KEY ("current_position_id") REFERENCES "user_positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "management_staffs" ADD CONSTRAINT "management_staffs_current_role_id_fkey" FOREIGN KEY ("current_role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_roles"("role_name") ON DELETE RESTRICT ON UPDATE CASCADE;
