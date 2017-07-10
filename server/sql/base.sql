Create database mydb;

CREATE TABLE IF NOT EXISTS `mydb`.`Territory` (
  `idTerritory` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `startx` INT NOT NULL,
  `starty` INT NOT NULL,
  `endx` INT NOT NULL,
  `endy` INT NOT NULL,
  PRIMARY KEY (`idTerritory`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`Squares` (
  `x` INT NOT NULL,
  `y` INT NOT NULL,
  `idTerritory` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`x`, `y`),
  INDEX `fk_Squares_Territory1_idx` (`idTerritory` ASC),
  CONSTRAINT `fk_Squares_Territory1`
    FOREIGN KEY (`idTerritory`)
    REFERENCES `mydb`.`Territory` (`idTerritory`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;