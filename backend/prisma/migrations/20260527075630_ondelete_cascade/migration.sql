-- DropForeignKey
ALTER TABLE `RecipeImage` DROP FOREIGN KEY `RecipeImage_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeIngredient` DROP FOREIGN KEY `RecipeIngredient_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeNutritionFacts` DROP FOREIGN KEY `RecipeNutritionFacts_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeStep` DROP FOREIGN KEY `RecipeStep_recipeId_fkey`;

-- DropIndex
DROP INDEX `RecipeImage_recipeId_fkey` ON `RecipeImage`;

-- DropIndex
DROP INDEX `RecipeIngredient_recipeId_fkey` ON `RecipeIngredient`;

-- DropIndex
DROP INDEX `RecipeStep_recipeId_fkey` ON `RecipeStep`;

-- AddForeignKey
ALTER TABLE `RecipeImage` ADD CONSTRAINT `RecipeImage_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeStep` ADD CONSTRAINT `RecipeStep_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeNutritionFacts` ADD CONSTRAINT `RecipeNutritionFacts_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
