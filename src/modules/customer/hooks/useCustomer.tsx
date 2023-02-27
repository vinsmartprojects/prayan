import axios from 'src/utils/axios';

export const useCustomer = () => {
  async function create(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/customers', {
        ...params,
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function update(id: any, data: any) {
    let result: any = null;
    try {
      const response = await axios.patch('/customers/' + id, {
        ...data,
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function getMany() {
    let result: any = null;
    try {
      const response = await axios.get('/customers');
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function getManyWithFilters(filter: any) {
    let result: any = null;
    try {
      const response = await axios.post('/customers/filter', {
        ...filter
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function search(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/customers/search', {
        ...params,
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function get(id: any) {
    let result: any = null;
    try {
      const response = await axios.get('/customers/' + id);
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }
  async function remove(id: any) {
    let result: any = null;
    try {
      const response = await axios.delete('/customers/' + id, {});
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }

  async function deleteMany(ids: any) {
    let result: any = null;
    try {
      const response = await axios.post('/customers/', {
        data: { ids: ids },
      });
      await response;
      if (response?.data?.data) {
        result = { data: response?.data?.data };
      } else {
        result = { error: response?.data?.error };
      }
    } catch (error: any) {
      result = { error: error };
    }
    return { ...result };
  }
  return {
    create,
    get,
    update,
    getMany,
    remove,
    deleteMany,
    getManyWithFilters,
    search,
  };
};
