import { BigInt, BigDecimal, EthereumEvent } from "@graphprotocol/graph-ts";

import { Account, Loan, Transaction } from "../generated/schema";

export function createEventID(event: EthereumEvent): string {
  return event.block.number
    .toString()
    .concat("-")
    .concat(event.logIndex.toString());
}

export function fetchAccount(id: string): Account {
  let account = Account.load(id);
  if (account == null) {
    account = new Account(id);
    account.balance = BigDecimal.fromString("0");
    account.cumulativeInterest = BigDecimal.fromString("0");
  }
  return account as Account;
}

function createLoanID(owner: string, recipient: string): string {
  return owner.concat("-").concat(recipient);
}

export function fetchLoan(owner: string, recipient: string): Loan {
  let id = createLoanID(owner, recipient);
  let loan = Loan.load(id);
  if (loan == null) {
    loan = new Loan(id);
    loan.owner = owner;
    loan.recipient = recipient;
    loan.amount = BigDecimal.fromString("0");
    loan.sInternalTotal = BigInt.fromI32(0);
    loan.interestEarned = BigDecimal.fromString("0");
  }
  return loan as Loan;
}

export function logTransaction(event: EthereumEvent): Transaction {
  let tx = new Transaction(event.transaction.hash.toHex());
  tx.timestamp = event.block.timestamp;
  tx.blockNumber = event.block.number;
  tx.save();
  return tx as Transaction;
}

export function toDai(value: BigInt): BigDecimal {
  return value.divDecimal(BigDecimal.fromString("1000000000000000000")); // 18 decimal
}
