import React from 'react'
import { Contract } from 'ethers'
import { ContractEnum } from '../../ContractEnum'
import DoubleGameContainer from '../DoubleGameContainer/DoubleGameContainer'
import Erc677GameContainer from '../Erc677GameContainer/Erc677GameContainer'

interface IGameContainerProps {
  contracts: {
    [ContractEnum.DoubleOrNothing]: Contract
    [ContractEnum.TTUsdt]: Contract
  }
  address: string
}

interface IGameContainerState {
  currentContract: ContractEnum
  logs: string[]
}

export class GameContainer extends React.PureComponent<
  IGameContainerProps,
  IGameContainerState
> {
  state = {
    currentContract: ContractEnum.DoubleOrNothing,
    logs: ['']
  }

  changeContract = (contract: ContractEnum) => {
    const { logs } = this.state
    this.setState({ currentContract: contract, logs: logs.concat(["change"]) })
  }

  render() {
    const { currentContract, logs } = this.state
    const { address, contracts } = this.props
    if (currentContract === ContractEnum.DoubleOrNothing) {
      return (
        <DoubleGameContainer
          contract={contracts[ContractEnum.DoubleOrNothing]}
          address={address}
          changeContract={this.changeContract}
        />
      )
    } else {
      return (
        <div>
        <Erc677GameContainer
          gameAddress={contracts[ContractEnum.DoubleOrNothing].address}
          contractName={ContractEnum.TTUsdt}
          contract={contracts[ContractEnum.TTUsdt]}
          address={address}
          changeContract={this.changeContract}
        />
        {logs.map(log => (<div>{log}</div>))}
        </div>
      )

    }
  }
}

export default GameContainer
