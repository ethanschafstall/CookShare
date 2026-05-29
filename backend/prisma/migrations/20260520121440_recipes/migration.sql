-- CreateTable
CREATE TABLE `Ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `caloriesPer100` DECIMAL(15, 2) NOT NULL,
    `proteinPer100` DECIMAL(15, 2) NOT NULL,
    `fatPer100` DECIMAL(15, 2) NOT NULL,
    `fatSaturatedPer100` DECIMAL(15, 2) NOT NULL,
    `carbsPer100` DECIMAL(15, 2) NOT NULL,
    `carbsSugarsPer100` DECIMAL(15, 2) NOT NULL,
    `sodiumPer100` DECIMAL(15, 2) NOT NULL,
    `fiberPer100` DECIMAL(15, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `urlId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `servings` INTEGER NULL,
    `prepTimeMin` INTEGER NULL,
    `cookTimeMin` INTEGER NULL,
    `difficulty` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hits` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Recipe_urlId_key`(`urlId`),
    UNIQUE INDEX `Recipe_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(255) NOT NULL,
    `altText` VARCHAR(255) NOT NULL,
    `storagePath` VARCHAR(2048) NOT NULL,
    `isCover` BOOLEAN NOT NULL,
    `displayOrder` INTEGER NOT NULL,
    `recipeId` INTEGER NOT NULL,

    UNIQUE INDEX `RecipeImage_storagePath_key`(`storagePath`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stepNumber` INTEGER NOT NULL,
    `instruction` LONGTEXT NOT NULL,
    `recipeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `displayOrder` INTEGER NOT NULL,
    `quantityG` DECIMAL(15, 2) NULL,
    `quantityNumeric` DECIMAL(5, 2) NULL,
    `displayUnit` VARCHAR(255) NULL,
    `note` VARCHAR(255) NULL,
    `ingredientId` INTEGER NULL,
    `recipeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeNutritionFacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalCalories` DECIMAL(15, 2) NOT NULL,
    `totalProteinG` DECIMAL(15, 2) NOT NULL,
    `totalFatG` DECIMAL(15, 2) NOT NULL,
    `totalFatSaturatedG` DECIMAL(15, 2) NOT NULL,
    `totalCarbsG` DECIMAL(15, 2) NOT NULL,
    `totalCarbsSugarsG` DECIMAL(15, 2) NOT NULL,
    `totalFiberG` DECIMAL(15, 2) NOT NULL,
    `totalSodiumMg` DECIMAL(15, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `recipeId` INTEGER NOT NULL,

    UNIQUE INDEX `RecipeNutritionFacts_recipeId_key`(`recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeImage` ADD CONSTRAINT `RecipeImage_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeStep` ADD CONSTRAINT `RecipeStep_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeNutritionFacts` ADD CONSTRAINT `RecipeNutritionFacts_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
