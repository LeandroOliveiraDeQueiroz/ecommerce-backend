import {
  ApiError,
  BadRequestError,
  ConflictError,
  InternalServerError,
} from '../errorHandler';

//Bad db access library choose
//PG error code https://www.postgresql.org/docs/current/errcodes-appendix.html
// No good NPM package for PG ERRORS - check health: snykAdvisor

export class DatabaseErrorMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toApiError(dbError: any): ApiError {
    if (dbError && dbError.code && dbError.detail) {
      switch (dbError.code) {
        // PG unique_violation
        case '23505': {
          const detailMatch =
            dbError.detail && typeof dbError.detail === 'string'
              ? dbError.detail.match(/Key \((.*?)\)=\((.*?)\) already exists./)
              : null;
          const field = detailMatch ? detailMatch[1] : undefined;
          const value = detailMatch ? detailMatch[2] : undefined;
          const portugueseField = this.translateFieldToPortuguese(field);

          const message = field
            ? `${portugueseField} '${value}' já existe.`
            : 'Violação: campo único';

          return new ConflictError(message, dbError.detail);
        }
        // PG not_null_violations
        case '23502': {
          const notNullMatch = dbError.detail
            ? dbError.detail.match(
                /null value in column "(.*?)" violates not-null constraint/
              )
            : null;
          const notNullField = notNullMatch ? notNullMatch[1] : undefined;

          const notNullMessage = notNullField
            ? `Campo '${notNullField}' não pode ser vazio.`
            : 'Violação: campo não vazio';

          return new BadRequestError(notNullMessage, dbError.detail);
        }
        default: {
          console.error(
            'Unhandled database error code:',
            dbError.code,
            dbError
          );

          return new InternalServerError(
            'Erro ocorreu no banco de dados',
            JSON.stringify(dbError)
          );
        }
      }
    }

    console.error('Unrecognized database error:', dbError);
    return new InternalServerError(
      'Erro não esperado ocorreu no banco de dados.',
      JSON.stringify(dbError)
    );
  }

  private static translateFieldToPortuguese(field?: string) {
    if (field && fieldNameTranslations[field]) {
      return fieldNameTranslations[field];
    }
    return field;
  }
}

const fieldNameTranslations: { [key: string]: string } = {
  name: 'nome',
  email: 'email',
  password: 'senha',
  product_quantity: 'quantidade de produto',
  title: 'título',
  description: 'descrição',
  favorite_product_list_id: 'lista produtos favoritos',
};
