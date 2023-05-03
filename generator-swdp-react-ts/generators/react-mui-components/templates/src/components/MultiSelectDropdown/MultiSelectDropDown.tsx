import React, { useState, useEffect } from "react";
import { Autocomplete, Checkbox, Chip } from "@mui/material";
import { TextField } from "@mui/material";
import dropdownService from "./multiselectdropdown.service";

const MultiSelectDropDown = (props: any) => {
    const [list, setList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [mark, setMark] = useState<string[]>([]);

    useEffect(() => {
        console.log(props, "props");
        if (props?.options !== undefined && props?.options?.length > 0) {
            setList(props.options);
            setLoading(props.loading);
        }
        else {
            setLoading(true);
            dropdownService.fetchData(props.url)
                .then((response) => {
                    console.log("response", response);
                    const options = response.data;
                    setList(options);
                    setLoading(false);
                });
        }

    }, [props]);

    return (
        <Autocomplete
            id={props.id}
            loading={loading}
            disabled={props.disabled}
            inputValue={props.inputValue}
            options={list}
            style={{ width: "200px" }}
            multiple
            value={mark}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}
            disableCloseOnSelect
            onChange={(event, values) => {
                setMark(values);
            }}
            renderTags={(values) =>
                values.map((value) => (
                    <Chip
                        key={value}
                        label={value}
                        onDelete={() => {
                            setMark(mark.filter((e) => e !== value))
                        }}
                    />
                ))
            }
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />

    );
};

export default MultiSelectDropDown;