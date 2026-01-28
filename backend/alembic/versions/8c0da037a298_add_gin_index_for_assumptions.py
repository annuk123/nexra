"""add GIN index for assumptions

Revision ID: 8c0da037a298
Revises: 
Create Date: 2026-01-26 05:58:35.265223

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c0da037a298'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute("CREATE INDEX idx_assumptions ON idea USING GIN (assumptions);")

def downgrade():
    op.execute("DROP INDEX idx_assumptions;")