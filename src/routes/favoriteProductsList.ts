import express from 'express';
import client from '../db';
import { FavoriteProductListController } from '../controllers/favoriteProductListController';
import { FavoriteProductListService } from '../services/favoriteProductList';
import { FavoriteProductListRepository } from '../repository/favoriteProductList';
import { FavoriteProductRepository } from '../repository/favoriteProduct';
import { FavoriteProductListDTO } from '../dto/favoriteProductListDTO';
import { FavoriteProductListRepositoryErrorProxy } from '../repository/favoriteProductList/proxy';
import { FavoriteProductRepositoryErrorProxy } from '../repository/favoriteProduct/proxy';

const favoriteProductsListRouter = express.Router();

//TODO create a Factory

//Create service
const favoriteProductListRepositoryRepository =
  new FavoriteProductListRepository(client);
const favoriteProductListRepositoryErrorProxy =
  new FavoriteProductListRepositoryErrorProxy(
    favoriteProductListRepositoryRepository
  );

const favoriteProductRepositoryRepository = new FavoriteProductRepository(
  client
);
const favoriteProductRepositoryErrorProxy =
  new FavoriteProductRepositoryErrorProxy(favoriteProductRepositoryRepository);

const favoriteProductListService = new FavoriteProductListService(
  favoriteProductListRepositoryErrorProxy,
  favoriteProductRepositoryErrorProxy
);

//Create controller
const createDTO = FavoriteProductListDTO.getCreateDTO();
const getDTO = FavoriteProductListDTO.getGetDTO();
const updateDTO = FavoriteProductListDTO.getUpdateDTO();
const deleteDTO = FavoriteProductListDTO.getDeleteDTO();
const addProductDTO = FavoriteProductListDTO.getAddProductDTO();
const removeProductDTO = FavoriteProductListDTO.getRemoveProductPostDTO();

const favoriteProductListController = new FavoriteProductListController(
  favoriteProductListService,
  createDTO,
  getDTO,
  updateDTO,
  deleteDTO,
  addProductDTO,
  removeProductDTO
);

favoriteProductsListRouter.post(
  '/create',
  favoriteProductListController.create.bind(favoriteProductListController)
);

favoriteProductsListRouter.get(
  '/',
  favoriteProductListController.get.bind(favoriteProductListController)
);

favoriteProductsListRouter.put(
  '/update',
  favoriteProductListController.update.bind(favoriteProductListController)
);

favoriteProductsListRouter.delete(
  '/delete',
  favoriteProductListController.delete.bind(favoriteProductListController)
);

favoriteProductsListRouter.post(
  '/add-product',
  favoriteProductListController.addProduct.bind(favoriteProductListController)
);

favoriteProductsListRouter.post(
  '/remove-product',
  favoriteProductListController.removeProduct.bind(
    favoriteProductListController
  )
);

export default favoriteProductsListRouter;
