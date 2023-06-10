import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'

type PlacesProps = {
  destination: (position: google.maps.LatLngLiteral) => void
}

function Destination({ destination }: PlacesProps) {
  var options = {
    types: ['(cities)'],
    componentRestrictions: { country: 'us' },
  }

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (val: string) => {
    setValue(val, false)
    clearSuggestions()

    const results = await getGeocode({
      address: val,
      // bounds: { north: 9.145, east: 40.4897, south: 0, west: 0 },
      // componentRestrictions: { country: 'Ethiopia', postalCode: '1000' },
    })
    const { lat, lng } = await getLatLng(results[0])
    destination({ lat, lng })
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="choose destination"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default Destination
