use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("y2ipkth52szcYUdzwqeeUVJvt2jSkDzPsJ1zm1cMfjp");

#[program]
pub mod oinker {
    use super::*;
    pub fn send_tweet(ctx: Context<SendOink>, argument: String, content: String) -> ProgramResult {
        let oink: &mut Account<Oink> = &mut ctx.accounts.oink;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if argument.chars().count() > 50 {
            return Err(ErrorCode::ArgumentTooLong.into())
        }

        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into())
        }

        oink.author = *author.key;
        oink.timestamp = clock.unix_timestamp;
        oink.argument = argument;
        oink.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendOink<'info> {
    #[account(init, payer = author, space = Oink::LEN)]
    pub oink: Account<'info, Oink>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct Oink {
    pub author: Pubkey,
    pub timestamp: i64,
    pub argument: String,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; 
const MAX_ARGUMENT_LENGTH: usize = 50 * 4; 
const MAX_CONTENT_LENGTH: usize = 280 * 4; 

impl Oink {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH 
        + TIMESTAMP_LENGTH 
        + STRING_LENGTH_PREFIX + MAX_ARGUMENT_LENGTH 
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; 
}

#[error]
pub enum ErrorCode {
    #[msg("The provided argument should be 50 characters long maximum.")]
    ArgumentTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}