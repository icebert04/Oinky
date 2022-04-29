import { useWorkspace } from '@/composables'
import { Oink } from '@/models'

export const getOink = async (publicKey) => {
    const { program } = useWorkspace()
    const account = await program.value.account.oink.fetch(publicKey);
    return new Oink(publicKey, account)
}
