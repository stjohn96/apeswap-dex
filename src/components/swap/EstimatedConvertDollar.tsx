import React from 'react'
import { tryParseAmount } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import styled from 'styled-components'
import { useCurrency } from 'hooks/Tokens'
import { useTradeExactOut } from 'hooks/Trades'

const EstimatedPriceDollar = styled.div`
  position: absolute;
  top: 73px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSubtle};
`
const EstimatedSymbol = styled.span`
  font-size: 18px;
  height: 0px;
  display: inline-block;
  line-height: 0.7;
  vertical-align: middle;
`
const CURRENCY_BUSD_ID = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'

export default function EstimatedConvertDollar({ currency, typedValue = null }: { currency: any; typedValue: any }) {
  const outputCurrency = useCurrency(CURRENCY_BUSD_ID)
  const parsedAmount = tryParseAmount(typedValue, currency)
  const parsedAmount2 = tryParseAmount('1', outputCurrency ?? undefined)
  const trade = useTradeExactOut(currency, parsedAmount2)

  const parsedAmounts = { [Field.INPUT]: trade?.inputAmount || parsedAmount }
  
  const value = 1/Number(parsedAmounts[Field.INPUT]?.toExact())
  const decimals = value < 0.01 ? 1000000000 : 100;
  const rate: any = Number(typedValue) * (Math.round((value) * decimals) / decimals);

  return (
    <EstimatedPriceDollar>
      <EstimatedSymbol>~</EstimatedSymbol>
      <span>${rate || 0}</span>
    </EstimatedPriceDollar>
  )
}
