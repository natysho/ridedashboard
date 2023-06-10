import React, { Children } from 'react'
import { Spinner, Button as customButton } from 'react-bootstrap'
import styled from 'styled-components'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'danger' | 'warning'
  isLoading?: boolean
  children?: any
  size?: 'sm' | 'lg'
  className?: string
  onClick?: any
}

const StyledButton = styled(customButton)``

export const VButton = (props: ButtonProps) => {
  return (
    <StyledButton
      variant={props.variant}
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="mr-2"
          />
        </>
      )}
      {props.children}
    </StyledButton>
  )
}
