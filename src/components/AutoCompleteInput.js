import {useEffect, useState} from 'react'
import {CREATESUGGESTION,GETSUGGESTIONS} from '../api'
import {TextField,CircularProgress} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

/** A input field with auto complete option, a new option can be added too
 * 
 * @param {Function} SetTitle - hook to add the title 
 * @param {string} title - the text writed by the user 
 */

function AutoCompleteInput({SetTitle,title}){
    const [suggestions,SetSuggestions] = useState()
    const [open, setOpen] = useState(false);
    const loading = open && suggestions.length === 0;


    useEffect(()=>{

        if (!loading) {
        return undefined;
        }

        const getSuggestions = async () =>{
          const result = await GETSUGGESTIONS()
          SetSuggestions(Object.values(result));
        }
  
        getSuggestions();
  
      },[loading])

    useEffect(() => {
        if (!open) {
            SetSuggestions([]);
        }
    }, [open]);

    return (
        <Autocomplete
          style={{ width: 300 }}
          clearOnBlur
          handleHomeEndKeys
          selectOnFocus
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}

          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              SetTitle(newValue)
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              SetTitle(newValue.inputValue)
              CREATESUGESTION(newValue.inputValue)
            } else {
            SetTitle(newValue)
            }
          }}

          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
    
            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                title: `Adicionar "${params.inputValue} ?"`,
              });
              
            }
    
            return filtered;
          }}
          options={suggestions ? suggestions : []}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              value={title}
              label="Adicione ou escolha um Titulo"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <div>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </div>
                ),
              }}
            />
          )}
        />
      );
    


}

export default AutoCompleteInput