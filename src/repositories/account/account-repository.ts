import { handleErrors, getHttpClient } from "../repository-utils";

class AccountRepository {
  async delete(): Promise<void> {
    const http = await getHttpClient();

    try {
      await http.delete<void>("account");
      return;
    } catch (e) {
      handleErrors(e);
      return;
    }
  }
}

export const accountRepository = new AccountRepository();
