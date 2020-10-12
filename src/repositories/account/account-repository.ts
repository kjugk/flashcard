import { handleErrors, getHttpClient } from "../repository-utils";

class AccountRepository {
  async delete(): Promise<void> {
    const http = await getHttpClient();

    try {
      await http.delete<void>("account");
    } catch (e) {
      return handleErrors(e);
    }
  }
}

export const accountRepository = new AccountRepository();
