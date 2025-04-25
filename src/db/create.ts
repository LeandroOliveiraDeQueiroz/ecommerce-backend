import {
  createFavoriteProductListTable,
  createFavoriteProductTable,
  createUserTable,
} from '../models';

const create = async () => {
  try {
    await createUserTable();
    await createFavoriteProductListTable();
    await createFavoriteProductTable();
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
};

export default create;
