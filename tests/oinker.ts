import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Oinker } from '../target/types/oinker';

describe('oinker', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Oinker as Program<Oinker>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
