import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    let [languageDefault, changeLanguage] = useState();
    const cookiesLanguage = new Cookies();

    const handleCheckedLanguageItem = () => {        
        // (document.querySelectorAll(`[id="js-language"] input`)as any).forEach((el:any) => {
        //     el.removeAttribute('checked');
        // })
        
        (document.querySelector(`[id="js-language-${languageDefault}"]`) as any).setAttribute('checked', '');
    }

    const handleDetectLanguage = (lang:any) => {
        i18n.changeLanguage(lang);
        cookiesLanguage.set('language', lang, { path: '/' });
        handleCheckedLanguageItem();
    }

    const loadLanguage = () => {
        languageDefault = cookiesLanguage.get('language') || 'vi';
        handleDetectLanguage(languageDefault);
    }

    changeLanguage = (event:any) => {
        languageDefault = event.target.value;
        handleDetectLanguage(languageDefault);
    }
    
    useEffect(function () {
        loadLanguage();
    }, [languageDefault]);

    return (
        <div className="login-language" onChange ={(e:any) => changeLanguage(e)} id="js-language">
            <input type="radio" value="vi" name="language" id="js-language-vi" /> Vietnamese
            <input type="radio" value="en" name="language"  id="js-language-en" /> English
        </div>
    )
}

export default LanguageSelector