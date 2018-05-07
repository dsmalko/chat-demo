class AddChannelToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :channel, :string
  end
end
