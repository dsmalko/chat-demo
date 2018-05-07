class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.bigint :user_id, index: true
      t.text :text 

      t.timestamps
    end
  end
end
