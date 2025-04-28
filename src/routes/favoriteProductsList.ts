import express from 'express';
import client from '../db';
import { FavoriteProductListController } from '../controllers/favoriteProductListController';
import { FavoriteProductListService } from '../services/favoriteProductList';
import { FavoriteProductListRepository } from '../repository/favoriteProductList';
import { FavoriteProductListDTO } from '../dto/favoriteProductListDTO';

const favoriteProductsListRouter = express.Router();

//TODO create a Factory
const favoriteProductListRepositoryRepository =
  new FavoriteProductListRepository(client);
const favoriteProductListService = new FavoriteProductListService(
  favoriteProductListRepositoryRepository
);

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

favoriteProductsListRouter.delete(
  '/remove-product',
  favoriteProductListController.removeProduct.bind(
    favoriteProductListController
  )
);

export default favoriteProductsListRouter;
