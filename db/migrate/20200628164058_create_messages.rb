class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :channel, index: true
      t.references :user
      t.text :text 

      t.timestamps
    end
  end
end
