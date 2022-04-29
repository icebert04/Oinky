import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '@/composables'
import { Oink } from '@/models'

export const sendOink = async (argument, content) => {
    const { wallet, program } = useWorkspace()
    const oink = web3.Keypair.generate()

    await program.value.rpc.sendOink(argument, content, {
        accounts: {
            author: wallet.value.publicKey,
            oink: oink.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [oink]
    })

    const oinkAccount = await program.value.account.oink.fetch(oink.publicKey)
    return new Oink(oink.publicKey, oinkAccount)
}
