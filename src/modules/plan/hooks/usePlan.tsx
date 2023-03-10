import axios from 'src/utils/axios';

export const usePlan = () => {
  async function create(params: any) {
    let result: any = null;
    try {
      const response = await axios.post('/plans', {
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
      const response = await axios.patch('/plans/' + id, {
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
      const response = await axios.get('/plans');
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
      const response = await axios.post('/plans/filter', {
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
      const response = await axios.post('/plans/search', {
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
      const response = await axios.get('/plans/' + id);
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
      const response = await axios.delete('/plans/' + id, {});
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
      const response = await axios.post('/plans/', {
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
