-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'HINDU', 'CHRISTIAN', 'BUDDO', 'OTHER');

-- CreateEnum
CREATE TYPE "Quranic_Section" AS ENUM ('NURANI', 'NAZERA', 'HIFZ');

-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- CreateEnum
CREATE TYPE "Months" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "EducationDegree" AS ENUM ('SSC', 'HSC', 'BSC', 'B_COM', 'B_ARTS', 'MSC', 'M_COM', 'M_ARTS', 'PHD', 'ALIM', 'DAKHIL', 'KAMIL', 'FAZIL', 'OTHERS');

-- CreateTable
CREATE TABLE "father_details" (
    "id" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "nid_no" TEXT,
    "occupation" TEXT,
    "job_title" TEXT,
    "educational_qualification" "EducationDegree",
    "monthly_income" TEXT,
    "mobile_no_1" TEXT,
    "mobile_no_2" TEXT,
    "mobile_no_3" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "father_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mother_details" (
    "id" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "nid_no" TEXT,
    "occupation" TEXT,
    "job_title" TEXT,
    "educational_qualification" "EducationDegree",
    "monthly_income" TEXT,
    "mobile_no_1" TEXT,
    "mobile_no_2" TEXT,
    "mobile_no_3" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "mother_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "is_mobile_verified" BOOLEAN NOT NULL DEFAULT false,
    "gender" "Gender" NOT NULL,
    "email" TEXT,
    "blood_group" "BloodGroup",
    "date_of_birth" TIMESTAMP(3),
    "height_in_cm" DOUBLE PRECISION,
    "weight_in_kg" DOUBLE PRECISION,
    "religion" "Religion",
    "nationality" TEXT NOT NULL DEFAULT 'Bangladeshi',
    "birth_certificate_number" TEXT,
    "nid_number" TEXT,
    "photo_url" TEXT,
    "user_name" TEXT,
    "user_password" TEXT DEFAULT 'sm1234ps',
    "active_status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "father_details_id" TEXT,
    "mother_details_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_full_name_mobile_number_key" ON "users"("full_name", "mobile_number");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_father_details_id_fkey" FOREIGN KEY ("father_details_id") REFERENCES "father_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_mother_details_id_fkey" FOREIGN KEY ("mother_details_id") REFERENCES "mother_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
