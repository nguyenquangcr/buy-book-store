import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDebounce from '../../hooks/useDebounce';
//style
import './style.scss';

interface ISearch {
  dataSearch?: Array<any>;
  callBackArraySuggest?: any;
  onError?: (error: Error, payload: Record<string, unknown>) => void;
}

const Search: React.FC<ISearch> = props => {
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const onChangeValueInputSearch = (e: any) => {
    try {
      const { value } = e.target;
      setSearchValue(value);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'onChangeValueInputSearch',
          args: { e },
        });
      }
    }
  };

  const debouncedSearch = useDebounce(searchValue, 400);

  useEffect(() => {
    try {
      props.callBackArraySuggest(null);
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'setvaluecallBackArraySuggest',
          args: {},
        });
      }
    }
  }, []);

  useEffect(() => {
    try {
      if (debouncedSearch === '') {
        props.callBackArraySuggest(null);
      } else {
        props.callBackArraySuggest(
          props.dataSearch &&
            props.dataSearch.filter(item => item.tenPhim.match(debouncedSearch))
        );
      }
    } catch (error) {
      if (typeof props.onError === 'function') {
        props.onError(error, {
          action: 'setvaluedataSearch',
          args: {},
        });
      }
    }
  }, [debouncedSearch, props.dataSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder={t('home:label_compoent_search_placehoder')}
        className="input-text"
        value={searchValue || ''}
        onChange={e => onChangeValueInputSearch(e)}
      />
    </div>
  );
};

export default Search;
